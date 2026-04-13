import { NextResponse } from 'next/server'
import { ComplianceStatus, SafeguardArea } from '@/types'

interface ComplianceAreaInput {
  area: SafeguardArea
  category: string
  status: ComplianceStatus
}

// Weights for each safeguard area (must sum to 1)
const AREA_WEIGHTS: Record<SafeguardArea, number> = {
  administrative: 0.35, // Most heavily weighted — administrative controls are primary
  technical: 0.30,      // Technical safeguards are critical for ePHI
  physical: 0.20,       // Physical safeguards
  organizational: 0.15, // Organizational requirements
}

// Status point values
const STATUS_POINTS: Record<ComplianceStatus, number> = {
  compliant: 100,
  partial: 50,
  non_compliant: 0,
  not_started: 0,
}

export async function POST(req: Request) {
  try {
    const { complianceAreas }: { complianceAreas: ComplianceAreaInput[] } = await req.json()

    if (!complianceAreas || complianceAreas.length === 0) {
      return NextResponse.json({
        overall: 0,
        administrative: 0,
        physical: 0,
        technical: 0,
        organizational: 0,
        details: {},
        riskLevel: 'critical',
        recommendations: [],
      })
    }

    // Group by area
    const areaGroups: Record<SafeguardArea, ComplianceAreaInput[]> = {
      administrative: [],
      physical: [],
      technical: [],
      organizational: [],
    }

    for (const area of complianceAreas) {
      if (areaGroups[area.area]) {
        areaGroups[area.area].push(area)
      }
    }

    // Calculate score per area
    const areaScores: Record<SafeguardArea, number> = {
      administrative: 0,
      physical: 0,
      technical: 0,
      organizational: 0,
    }

    const areaDetails: Record<SafeguardArea, {
      score: number
      total: number
      compliant: number
      partial: number
      non_compliant: number
      not_started: number
    }> = {
      administrative: { score: 0, total: 0, compliant: 0, partial: 0, non_compliant: 0, not_started: 0 },
      physical: { score: 0, total: 0, compliant: 0, partial: 0, non_compliant: 0, not_started: 0 },
      technical: { score: 0, total: 0, compliant: 0, partial: 0, non_compliant: 0, not_started: 0 },
      organizational: { score: 0, total: 0, compliant: 0, partial: 0, non_compliant: 0, not_started: 0 },
    }

    for (const area of (['administrative', 'physical', 'technical', 'organizational'] as SafeguardArea[])) {
      const items = areaGroups[area]
      if (items.length === 0) {
        areaScores[area] = 0
        continue
      }

      const total = items.reduce((acc, item) => acc + STATUS_POINTS[item.status], 0)
      areaScores[area] = Math.round(total / items.length)

      // Build details
      areaDetails[area].total = items.length
      areaDetails[area].score = areaScores[area]
      for (const item of items) {
        areaDetails[area][item.status]++
      }
    }

    // Calculate weighted overall score
    let overall = 0
    let totalWeight = 0

    for (const area of (['administrative', 'physical', 'technical', 'organizational'] as SafeguardArea[])) {
      if (areaGroups[area].length > 0) {
        overall += areaScores[area] * AREA_WEIGHTS[area]
        totalWeight += AREA_WEIGHTS[area]
      }
    }

    if (totalWeight > 0) {
      overall = Math.round(overall / totalWeight)
    }

    // Determine risk level
    let riskLevel: string
    if (overall >= 80) riskLevel = 'low'
    else if (overall >= 60) riskLevel = 'moderate'
    else if (overall >= 40) riskLevel = 'high'
    else riskLevel = 'critical'

    // Generate priority recommendations
    const recommendations: string[] = []

    if (areaScores.administrative < 60) {
      recommendations.push('Complete a formal HIPAA Risk Analysis — this is the #1 requirement and foundation for all other safeguards')
    }
    if (areaScores.technical < 60) {
      recommendations.push('Implement unique user accounts and automatic session timeouts on all systems containing PHI')
    }
    if (areaScores.physical < 60) {
      recommendations.push('Review and document physical access controls for areas where PHI is stored or accessed')
    }
    if (areaScores.organizational < 60) {
      recommendations.push('Execute Business Associate Agreements with all vendors who access, store, or transmit PHI')
    }

    // Check for non-compliant critical items
    const criticalItems = complianceAreas.filter(a =>
      a.status === 'non_compliant' &&
      (a.area === 'administrative' || a.category.toLowerCase().includes('risk'))
    )

    if (criticalItems.length > 0) {
      recommendations.push(`Address ${criticalItems.length} non-compliant administrative safeguard(s) immediately — these represent the highest audit risk`)
    }

    if (complianceAreas.filter(a => a.status === 'not_started').length > complianceAreas.length * 0.5) {
      recommendations.push('Over 50% of compliance areas have not been started — schedule a compliance review session this week')
    }

    return NextResponse.json({
      overall,
      administrative: areaScores.administrative,
      physical: areaScores.physical,
      technical: areaScores.technical,
      organizational: areaScores.organizational,
      details: areaDetails,
      riskLevel,
      recommendations: recommendations.slice(0, 5),
      totalItems: complianceAreas.length,
      compliantCount: complianceAreas.filter(a => a.status === 'compliant').length,
      partialCount: complianceAreas.filter(a => a.status === 'partial').length,
      nonCompliantCount: complianceAreas.filter(a => a.status === 'non_compliant').length,
      notStartedCount: complianceAreas.filter(a => a.status === 'not_started').length,
    })
  } catch (error) {
    console.error('Compliance score error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate compliance score' },
      { status: 500 }
    )
  }
}
