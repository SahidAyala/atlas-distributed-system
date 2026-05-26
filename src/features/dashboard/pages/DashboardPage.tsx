import { SimpleGrid, VStack, Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/layout/PageHeader'
import { MetricCard } from '@/components/ui/MetricCard'
import { TimeSeriesChart } from '@/components/data/TimeSeriesChart'
import { SkeletonCard } from '@/components/feedback/SkeletonCard'
import { useDashboard } from '../hooks/useDashboard'

export function DashboardPage() {
  const { t } = useTranslation()
  const { metrics, eventSeries, isLoading } = useDashboard()
  const cardBg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <VStack align="stretch" spacing={6}>
      <PageHeader
        title={t('nav.dashboard')}
        description="Platform health and activity overview."
      />

      {/* KPI row */}
      {isLoading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
          <SkeletonCard count={4} />
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
          <MetricCard
            label="Total Events"
            value={metrics?.totalEvents.toLocaleString()}
            change={metrics?.eventsTrend}
            helpText="vs. last 24h"
          />
          <MetricCard
            label="Active Workflows"
            value={metrics?.activeWorkflows}
          />
          <MetricCard
            label="Failed Executions"
            value={metrics?.failedExecutions}
            change={metrics?.failedTrend}
            helpText="vs. last 24h"
          />
          <MetricCard
            label="Tenants"
            value={metrics?.tenantCount}
          />
        </SimpleGrid>
      )}

      {/* Event volume chart */}
      <Box
        bg={cardBg}
        border="1px"
        borderColor={border}
        borderRadius="lg"
        p={5}
      >
        <Heading size="xs" fontWeight="600" mb={4} color="text.muted" textTransform="uppercase" letterSpacing="wider">
          Event Volume — Last 7 Days
        </Heading>
        <TimeSeriesChart
          data={eventSeries}
          series={[
            { key: 'events', label: 'Events', color: '#6366F1' },
            { key: 'failures', label: 'Failures', color: '#EF4444' },
          ]}
          xKey="time"
          height={260}
        />
      </Box>
    </VStack>
  )
}
