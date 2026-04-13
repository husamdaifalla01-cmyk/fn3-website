import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { formatDate, formatCurrency } from '@/lib/utils'
import { LeaseRiskBadge } from '@/components/dashboard/LeaseRiskBadge'
import { LeaseAnalyzer } from './LeaseAnalyzer'
import { AIResponseComposer } from '@/components/dashboard/AIResponseComposer'
import { RentIncreaseGenerator } from './RentIncreaseGenerator'
import { Phone, Mail, Calendar, DollarSign, Home } from 'lucide-react'

export default async function TenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: tenant } = await supabase
    .from('pm_tenants')
    .select('*, pm_units(unit_number, pm_properties(name, address))')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!tenant) notFound()

  const { data: messages } = await supabase
    .from('pm_messages')
    .select('*')
    .eq('tenant_id', id)
    .order('created_at', { ascending: false })
    .limit(20)

  const unit = tenant.pm_units as { unit_number: string; pm_properties: { name: string; address?: string } } | null
  const analysis = tenant.lease_analysis as {
    risk_score: number
    risk_level: string
    summary: string
    flagged_clauses: Array<{ type: string; clause: string; risk: string; severity: string }>
    recommendations: string[]
    renewal_terms: string
    early_termination_risk: string
    pet_policy: string
    maintenance_responsibilities: string
    rent_increase_cap: string
  } | null

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl font-semibold text-slate-200">
            {tenant.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{tenant.name}</h1>
            {unit && (
              <p className="text-slate-400 text-sm mt-0.5">
                Unit {unit.unit_number} · {unit.pm_properties.name}
              </p>
            )}
          </div>
        </div>
        <LeaseRiskBadge score={tenant.risk_score} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: info */}
        <div className="space-y-4">
          {/* Contact */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Contact</h3>
            <div className="space-y-2.5">
              {tenant.email && (
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href={`mailto:${tenant.email}`} className="hover:text-white transition-colors truncate">{tenant.email}</a>
                </div>
              )}
              {tenant.phone && (
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <a href={`tel:${tenant.phone}`} className="hover:text-white transition-colors">{tenant.phone}</a>
                </div>
              )}
              {unit && (
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <Home className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Unit {unit.unit_number}, {unit.pm_properties.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Lease */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Lease</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{formatDate(tenant.lease_start)} — {formatDate(tenant.lease_end)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <DollarSign className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{formatCurrency(tenant.monthly_rent)}/month</span>
              </div>
            </div>
          </div>

          {/* Analysis summary */}
          {analysis && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Lease Analysis</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">{analysis.summary}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Early termination risk</span>
                  <span className="text-slate-300 text-right max-w-[60%]">{analysis.early_termination_risk}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Rent increase cap</span>
                  <span className="text-slate-300 text-right max-w-[60%]">{analysis.rent_increase_cap}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lease Analyzer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Lease Intelligence</h2>
            <LeaseAnalyzer
              tenantId={tenant.id}
              existingAnalysis={analysis}
              existingLeaseText={tenant.lease_text}
            />
          </div>

          {/* AI Response Composer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Respond to Tenant</h2>
            <AIResponseComposer
              tenantId={tenant.id}
              tenantName={tenant.name}
              unitNumber={unit?.unit_number || '—'}
              propertyName={unit?.pm_properties.name || '—'}
              leaseEndDate={tenant.lease_end || undefined}
              monthlyRent={tenant.monthly_rent || undefined}
            />
          </div>

          {/* Rent Increase Notice Generator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-violet-400" />
              <h2 className="text-base font-semibold text-white">Rent Increase Notice</h2>
            </div>
            <RentIncreaseGenerator
              tenantName={tenant.name}
              unitNumber={unit?.unit_number || '—'}
              currentRent={tenant.monthly_rent}
            />
          </div>

          {/* Message History */}
          {messages && messages.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-4">Message History</h2>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-lg border text-sm ${
                    msg.direction === 'inbound'
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-violet-600/5 border-violet-500/20'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-500">
                        {msg.direction === 'inbound' ? 'Tenant' : 'You'} · {msg.channel}
                      </span>
                      <span className="text-xs text-slate-600">{formatDate(msg.created_at)}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
