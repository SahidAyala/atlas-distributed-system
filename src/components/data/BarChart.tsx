import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Box, useColorModeValue } from '@chakra-ui/react'
import type { ChartSeries } from './TimeSeriesChart'

interface BarChartProps {
  data: Record<string, unknown>[]
  series: ChartSeries[]
  xKey?: string
  height?: number
  stacked?: boolean
}

export function BarChart({ data, series, xKey = 'label', height = 280, stacked }: BarChartProps) {
  const gridColor = useColorModeValue('#E5E7EB', '#374151')
  const tooltipBg = useColorModeValue('#ffffff', '#1F2937')
  const tooltipBorder = useColorModeValue('#E5E7EB', '#374151')
  const tickColor = useColorModeValue('#6B7280', '#9CA3AF')

  return (
    <Box h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: tickColor }}
            axisLine={false}
            tickLine={false}
          />
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
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              radius={[3, 3, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  )
}
