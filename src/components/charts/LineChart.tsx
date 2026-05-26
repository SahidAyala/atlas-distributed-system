import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Box, useColorModeValue } from '@chakra-ui/react'

export interface ChartSeries {
  key: string
  label: string
  color: string
}

interface LineChartProps {
  data: Record<string, unknown>[]
  series: ChartSeries[]
  xKey?: string
  height?: number
}

// Themed Recharts LineChart. The `ChartSeries` type is exported here as the
// canonical definition; AreaChart and BarChart re-export/import from this file.
export function LineChart({ data, series, xKey = 'time', height = 280 }: LineChartProps) {
  const gridColor = useColorModeValue('#E5E7EB', '#374151')
  const tooltipBg = useColorModeValue('#ffffff', '#1F2937')
  const tooltipBorder = useColorModeValue('#E5E7EB', '#374151')
  const tickColor = useColorModeValue('#6B7280', '#9CA3AF')

  return (
    <Box h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '6px',
              fontSize: '12px',
              padding: '8px 12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  )
}
