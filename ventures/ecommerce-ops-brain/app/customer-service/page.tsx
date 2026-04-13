'use client'

import { useState } from 'react'
import { mockTickets } from '@/lib/mock-data'

type Ticket = {
  id: string
  store_id: string
  customer_email: string | null
  customer_name: string | null
  subject: string | null
  original_message: string | null
  ai_draft_reply: string | null
  status: 'pending' | 'replied' | 'resolved'
  ticket_type: 'return' | 'shipping' | 'product_question' | 'complaint' | null
  created_at: string
}

const TICKET_TYPE_COLORS = {
  return: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', label: 'Return' },
  shipping: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', label: 'Shipping' },
  product_question: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', label: 'Question' },
  complaint: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', label: 'Complaint' },
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function CustomerServicePage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets as Ticket[])
  const [activeTicket, setActiveTicket] = useState<string | null>(tickets[0]?.id || null)
  const [generating, setGenerating] = useState<string | null>(null)
  const [editingReply, setEditingReply] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'replied' | 'resolved'>('all')

  const filtered = tickets.filter(t => filter === 'all' ? true : t.status === filter)
  const activeTicketData = tickets.find(t => t.id === activeTicket)

  async function generateReply(ticket: Ticket) {
    setGenerating(ticket.id)
    try {
      const res = await fetch('/api/reply-to-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: ticket.original_message,
          customerName: ticket.customer_name,
          ticketType: ticket.ticket_type,
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      if (data.reply) {
        setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, ai_draft_reply: data.reply } : t))
        setEditingReply(data.reply)
      }
    } catch (err) {
      console.error(err)
    }
    setGenerating(null)
  }

  function markResolved(ticketId: string) {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'resolved' as const } : t))
    const remainingPending = tickets.filter(t => t.id !== ticketId && t.status === 'pending')
    if (remainingPending.length > 0) setActiveTicket(remainingPending[0].id)
  }

  function approveAndSend(ticketId: string) {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'replied' as const, ai_draft_reply: editingReply } : t))
    const remainingPending = tickets.filter(t => t.id !== ticketId && t.status === 'pending')
    if (remainingPending.length > 0) setActiveTicket(remainingPending[0].id)
  }

  const pendingCount = tickets.filter(t => t.status === 'pending').length

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Ticket List */}
      <div style={{
        width: '340px',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800 }}>Customer Service</h1>
            {pendingCount > 0 && (
              <span style={{ background: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>
                {pendingCount}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['all', 'pending', 'replied', 'resolved'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  borderColor: filter === f ? '#f97316' : '#1e293b',
                  background: filter === f ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  color: filter === f ? '#f97316' : '#64748b',
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(ticket => {
            const typeInfo = ticket.ticket_type ? TICKET_TYPE_COLORS[ticket.ticket_type] : TICKET_TYPE_COLORS.product_question
            const isActive = activeTicket === ticket.id
            return (
              <button
                key={ticket.id}
                onClick={() => {
                  setActiveTicket(ticket.id)
                  setEditingReply(ticket.ai_draft_reply || '')
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 20px',
                  borderBottom: '1px solid #1e293b',
                  background: isActive ? 'rgba(249, 115, 22, 0.06)' : 'transparent',
                  borderLeft: isActive ? '3px solid #f97316' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9' }}>{ticket.customer_name}</span>
                  <span style={{ fontSize: '11px', color: '#475569', flexShrink: 0 }}>{timeAgo(ticket.created_at)}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ticket.subject}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {ticket.ticket_type && (
                    <span style={{ background: typeInfo.bg, color: typeInfo.color, fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '100px' }}>
                      {typeInfo.label}
                    </span>
                  )}
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: ticket.status === 'pending' ? '#f97316' : ticket.status === 'replied' ? '#22c55e' : '#64748b',
                  }}>
                    {ticket.status === 'pending' ? '● Pending' : ticket.status === 'replied' ? '✓ Replied' : '✓ Resolved'}
                  </span>
                  {ticket.ai_draft_reply && ticket.status === 'pending' && (
                    <span style={{ fontSize: '11px', color: '#8b5cf6' }}>AI Draft Ready</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Ticket Detail */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTicketData ? (
          <>
            {/* Ticket Header */}
            <div style={{ padding: '20px 28px', borderBottom: '1px solid #1e293b', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{activeTicketData.subject}</h2>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#64748b' }}>
                    <span>From: <strong style={{ color: '#94a3b8' }}>{activeTicketData.customer_name}</strong></span>
                    <span>{activeTicketData.customer_email}</span>
                    <span>{timeAgo(activeTicketData.created_at)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {activeTicketData.status === 'pending' && (
                    <button
                      onClick={() => markResolved(activeTicketData.id)}
                      style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Customer Message */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Customer Message
                </div>
                <div style={{
                  background: '#0f1624',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '14px',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                }}>
                  {activeTicketData.original_message}
                </div>
              </div>

              {/* AI Reply Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {activeTicketData.ai_draft_reply ? 'AI Draft Reply' : 'Generate AI Reply'}
                  </div>
                  {activeTicketData.status === 'pending' && (
                    <button
                      onClick={() => generateReply(activeTicketData)}
                      disabled={generating === activeTicketData.id}
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        color: 'white',
                        border: 'none',
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: generating === activeTicketData.id ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {generating === activeTicketData.id ? (
                        <>⏳ Generating...</>
                      ) : (
                        <>🤖 {activeTicketData.ai_draft_reply ? 'Regenerate' : 'Generate AI Reply'}</>
                      )}
                    </button>
                  )}
                </div>

                {activeTicketData.ai_draft_reply || editingReply ? (
                  <div>
                    <textarea
                      value={editingReply || activeTicketData.ai_draft_reply || ''}
                      onChange={(e) => setEditingReply(e.target.value)}
                      disabled={activeTicketData.status !== 'pending'}
                      rows={10}
                      style={{
                        width: '100%',
                        background: '#0f1624',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#cbd5e1',
                        lineHeight: 1.7,
                        resize: 'vertical',
                        outline: 'none',
                        fontFamily: 'inherit',
                        marginBottom: '12px',
                      }}
                    />
                    {activeTicketData.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => approveAndSend(activeTicketData.id)}
                          style={{
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)',
                          }}
                        >
                          ✓ Approve & Send
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(editingReply || activeTicketData.ai_draft_reply || '')}
                          style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>
                ) : activeTicketData.status === 'pending' ? (
                  <div style={{
                    background: '#0f1624',
                    border: '1px dashed #1e293b',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    color: '#475569',
                    fontSize: '14px',
                  }}>
                    Click &ldquo;Generate AI Reply&rdquo; to get an instant draft based on the customer&apos;s message
                  </div>
                ) : (
                  <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px 20px', fontSize: '14px', color: '#64748b' }}>
                    This ticket is {activeTicketData.status}.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: '15px' }}>
            Select a ticket to view details
          </div>
        )}
      </div>
    </div>
  )
}
