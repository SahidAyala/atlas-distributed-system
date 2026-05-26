import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { render } from '@/test/utils'

import { DataTable } from './DataTable'
import type { ColumnDef } from './DataTable'

interface Row {
  id: string
  name: string
  status: string
}

const columns: ColumnDef<Row>[] = [
  { key: 'name', header: 'Name', cell: (row) => row.name },
  { key: 'status', header: 'Status', cell: (row) => row.status },
]

const rows: Row[] = [
  { id: '1', name: 'Alpha', status: 'active' },
  { id: '2', name: 'Beta', status: 'inactive' },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={rows} keyExtractor={(r) => r.id} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders a row per data item', () => {
    render(<DataTable columns={columns} data={rows} keyExtractor={(r) => r.id} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('shows skeleton when isLoading is true', () => {
    const { container } = render(
      <DataTable columns={columns} data={[]} isLoading keyExtractor={(r) => r.id} />,
    )
    // Skeleton renders table rows but no data cells
    expect(container.querySelectorAll('td').length).toBeGreaterThan(0)
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
  })

  it('shows empty state when data is empty', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        keyExtractor={(r) => r.id}
        emptyMessage="Nothing here"
      />,
    )
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('calls onRowClick when a row is clicked', async () => {
    const handler = vi.fn()
    render(
      <DataTable
        columns={columns}
        data={rows}
        keyExtractor={(r) => r.id}
        onRowClick={handler}
      />,
    )
    await userEvent.click(screen.getByText('Alpha'))
    expect(handler).toHaveBeenCalledWith(rows[0])
  })
})
