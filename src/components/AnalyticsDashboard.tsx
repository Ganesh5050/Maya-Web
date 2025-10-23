import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Download,
  Share2,
  Zap,
  Target,
  Award,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];

  const metrics = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'traffic',
      title: 'Traffic',
      icon: Globe,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'users',
      title: 'Users',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const overviewStats = [
    {
      title: 'Total Visitors',
      value: '24,567',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Page Views',
      value: '89,234',
      change: '+8.3%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-400'
    },
    {
      title: 'Bounce Rate',
      value: '34.2%',
      change: '-2.1%',
      trend: 'down',
      icon: MousePointer,
      color: 'text-purple-400'
    },
    {
      title: 'Avg. Session',
      value: '3m 42s',
      change: '+15.7%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-400'
    }
  ];

  const trafficData = [
    { source: 'Direct', visitors: 8540, percentage: 34.7, color: 'bg-blue-500' },
    { source: 'Search', visitors: 6230, percentage: 25.3, color: 'bg-green-500' },
    { source: 'Social', visitors: 4120, percentage: 16.8, color: 'bg-purple-500' },
    { source: 'Referral', visitors: 3890, percentage: 15.8, color: 'bg-orange-500' },
    { source: 'Email', visitors: 1787, percentage: 7.3, color: 'bg-pink-500' }
  ];

  const deviceData = [
    { device: 'Desktop', visitors: 15670, percentage: 63.8, icon: Monitor },
    { device: 'Mobile', visitors: 7230, percentage: 29.4, icon: Smartphone },
    { device: 'Tablet', visitors: 1667, percentage: 6.8, icon: Tablet }
  ];

  const topPages = [
    { page: '/', views: 12450, visitors: 8920, bounceRate: 28.5 },
    { page: '/features', views: 8930, visitors: 6230, bounceRate: 32.1 },
    { page: '/pricing', views: 6780, visitors: 4560, bounceRate: 45.2 },
    { page: '/templates', views: 5420, visitors: 3890, bounceRate: 38.7 },
    { page: '/contact', views: 3210, visitors: 2340, bounceRate: 52.3 }
  ];

  const performanceMetrics = [
    {
      metric: 'First Contentful Paint',
      value: '1.2s',
      status: 'good',
      target: '< 1.5s'
    },
    {
      metric: 'Largest Contentful Paint',
      value: '2.1s',
      status: 'good',
      target: '< 2.5s'
    },
    {
      metric: 'Cumulative Layout Shift',
      value: '0.08',
      status: 'good',
      target: '< 0.1'
    },
    {
      metric: 'First Input Delay',
      value: '45ms',
      status: 'excellent',
      target: '< 100ms'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            Data-Driven Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your website's performance with comprehensive analytics. 
            Make informed decisions based on real user data and behavior patterns.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Metric Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                  {metrics.map((metric) => (
                    <Button
                      key={metric.id}
                      variant={selectedMetric === metric.id ? "default" : "outline"}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`whitespace-nowrap ${
                        selectedMetric === metric.id
                          ? "bg-blue-600 text-white"
                          : "border-gray-600 text-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <metric.icon className="w-4 h-4 mr-2" />
                      {metric.title}
                    </Button>
                  ))}
                </div>

                {/* Time Range */}
                <div className="flex gap-2">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.id}
                      variant={timeRange === range.id ? "default" : "outline"}
                      onClick={() => setTimeRange(range.id)}
                      size="sm"
                      className={timeRange === range.id ? "bg-blue-600 text-white" : "border-gray-600 text-gray-300"}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Overview Stats */}
        {selectedMetric === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color.replace('text-', 'from-').replace('-400', '-500')} to-${stat.color.split('-')[1]}-600 flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.title}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Traffic Analysis */}
        {selectedMetric === 'traffic' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Traffic Sources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Traffic Sources</CardTitle>
                  <CardDescription className="text-gray-300">
                    Where your visitors come from
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trafficData.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{source.source}</span>
                        <span className="text-gray-400">{source.visitors.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${source.color}`}
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-400">{source.percentage}%</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Device Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Device Breakdown</CardTitle>
                  <CardDescription className="text-gray-300">
                    Visitor device distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <device.icon className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{device.visitors.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{device.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Performance Metrics */}
        {selectedMetric === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Core Web Vitals</CardTitle>
                <CardDescription className="text-gray-300">
                  Performance metrics that matter for user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-black/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{metric.metric}</span>
                        <Badge className={`${
                          metric.status === 'excellent' ? 'bg-green-500/20 text-green-300' :
                          metric.status === 'good' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">Target: {metric.target}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white">Top Pages</CardTitle>
              <CardDescription className="text-gray-300">
                Most visited pages and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors">
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{page.page}</div>
                      <div className="text-sm text-gray-400">
                        {page.views.toLocaleString()} views • {page.visitors.toLocaleString()} visitors
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{page.bounceRate}%</div>
                      <div className="text-sm text-gray-400">Bounce Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center gap-4"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
            <Share2 className="w-4 h-4 mr-2" />
            Share Dashboard
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
