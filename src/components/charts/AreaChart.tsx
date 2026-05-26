import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Box, useColorModeValue } from '@chakra-ui/react'

import type { ChartSeries } from './LineChart'

interface AreaChartProps {
  data: Record<string, unknown>[]
  series: ChartSeries[]
  xKey?: string
  height?: number
  stacked?: boolean
}

export function AreaChart({ data, series, xKey = 'time', height = 280, stacked }: AreaChartProps) {
  const gridColor = useColorModeValue('#E5E7EB', '#374151')
  const tooltipBg = useColorModeValue('#ffffff', '#1F2937')
  const tooltipBorder = useColorModeValue('#E5E7EB', '#374151')
  const tickColor = useColorModeValue('#6B7280', '#9CA3AF')

  return (
    <Box h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
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
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              fill={`url(#grad-${s.key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
