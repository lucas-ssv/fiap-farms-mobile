import React, { useEffect, useState } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { Text } from '@/presentation/components/ui'
import type { ProductModel } from '@/domain/models/product'
import type { SaleModel } from '@/domain/models/sale'
import type { ProductionModel } from '@/domain/models/production'
import type { WatchProducts } from '@/domain/usecases/product'
import type { WatchSales } from '@/domain/usecases/sale'
import type { WatchProductions } from '@/domain/usecases/production'

interface DashboardProps {
  watchProducts: WatchProducts
  watchSales: WatchSales
  watchProductions: WatchProductions
}

interface PieChartDataItem {
  name: string
  amount: number
  color: string
  legendFontColor: string
  legendFontSize: number
}

const COLORS = [
  '#1B5E20',
  '#2E7D32',
  '#388E3C',
  '#43A047',
  '#4CAF50',
  '#66BB6A',
  '#81C784',
  '#A5D6A7',
]

export function Dashboard({
  watchProducts,
  watchSales,
  watchProductions,
}: DashboardProps) {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [sales, setSales] = useState<SaleModel[]>([])
  const [productions, setProductions] = useState<ProductionModel[]>([])

  useEffect(() => {
    const unsubscribeProducts = watchProducts.execute(setProducts)
    const unsubscribeSales = watchSales.execute(setSales)
    const unsubscribeProductions = watchProductions.execute(setProductions)

    return () => {
      unsubscribeProducts()
      unsubscribeSales()
      unsubscribeProductions()
    }
  }, [watchProducts, watchSales, watchProductions])

  const chartData = products
    .map((product) => {
      const relatedSales = sales.filter(
        (sale) => sale.product.id === product.id
      )

      if (relatedSales.length === 0) return null

      const totalRevenue = relatedSales.reduce(
        (sum, sale) => sum + sale.totalPrice,
        0
      )

      const unitCost =
        product.stock > 0 ? product.cost / product.stock : product.cost

      const totalCost = relatedSales.reduce(
        (sum, sale) => sum + unitCost * sale.quantity,
        0
      )

      const profit = totalRevenue - totalCost

      return {
        date: product.name,
        profit: parseFloat(profit.toFixed(2)),
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => b.profit - a.profit)

  const filteredData = chartData

  const pieChartData: PieChartDataItem[] = products
    .slice(0, COLORS.length)
    .map((product, index) => ({
      name:
        product.name.length > 12
          ? product.name.substring(0, 12) + '...'
          : product.name,
      amount: product.stock,
      color: COLORS[index],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }))
    .filter((item) => item.amount > 0)

  const productionStats = {
    waiting: productions.filter((p) => p.status === 'waiting').length,
    inProduction: productions.filter((p) => p.status === 'in_production')
      .length,
    harvested: productions.filter((p) => p.status === 'harvested').length,
    total: productions.length,
  }

  const recentProductions = productions
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 6)

  const getStatusColor = (status: ProductionModel['status']) => {
    switch (status) {
      case 'waiting':
        return 'text-yellow-600 bg-yellow-100'
      case 'in_production':
        return 'text-blue-600 bg-blue-100'
      case 'harvested':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: ProductionModel['status']) => {
    switch (status) {
      case 'waiting':
        return 'Aguardando'
      case 'in_production':
        return 'Em Produção'
      case 'harvested':
        return 'Colhido'
      default:
        return 'Desconhecido'
    }
  }

  function getSalesEvolutionData(sales: SaleModel[]) {
    const result: Record<string, number> = {}
    sales.forEach((sale) => {
      let date: Date | null = null
      if (
        sale.saleDate &&
        typeof (sale.saleDate as any).toDate === 'function'
      ) {
        date = (sale.saleDate as any).toDate()
      } else if (sale.saleDate instanceof Date) {
        date = sale.saleDate
      } else if (typeof sale.saleDate === 'string') {
        date = new Date(sale.saleDate)
      }
      if (!date || isNaN(date.getTime())) return
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}`
      result[key] = (result[key] || 0) + sale.totalPrice
    })
    return Object.entries(result)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }))
  }

  const salesEvolutionData = getSalesEvolutionData(sales)
  const salesEvolutionChartData = {
    labels: salesEvolutionData.slice(-6).map((item) => {
      const [year, month] = item.month.split('-')
      return `${month}/${year.slice(-2)}`
    }),
    datasets: [
      {
        data: salesEvolutionData.slice(-6).map((item) => item.total),
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  const screenWidth = Dimensions.get('window').width

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2E7D32',
    },
  }

  const data = {
    labels: filteredData
      .slice(0, 6)
      .map((item) =>
        item.date.length > 8 ? item.date.substring(0, 8) + '...' : item.date
      ),
    datasets: [
      {
        data: filteredData.slice(0, 6).map((item) => item.profit),
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  }

  if (
    filteredData.length === 0 &&
    pieChartData.length === 0 &&
    salesEvolutionData.length === 0
  ) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-500 text-center">
          Não há dados suficientes para exibir os gráficos.
          {'\n'}Adicione produtos e vendas para visualizar as informações.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        {filteredData.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Lucro por Produto
            </Text>
            <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <LineChart
                data={data}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withDots={true}
                withShadow={false}
                withInnerLines={false}
                withOuterLines={false}
              />
            </View>
          </>
        )}

        {pieChartData.length > 0 && (
          <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Produtos Populares (Estoque)
            </Text>
            <View className="items-center">
              <PieChart
                data={pieChartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 10]}
                absolute
              />
            </View>
          </View>
        )}

        {/* Detalhes dos Produtos - Lucro */}
        {filteredData.length > 0 && (
          <View className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
            <Text className="text-lg font-semibold text-gray-700 mb-3">
              Detalhes dos Produtos
            </Text>
            {filteredData.slice(0, 10).map((item, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center py-2 border-b border-gray-100"
              >
                <Text className="text-gray-700 flex-1 mr-2" numberOfLines={1}>
                  {item.date}
                </Text>
                <Text
                  className={`font-semibold ${
                    item.profit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  R$ {item.profit.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {salesEvolutionData.length > 0 && (
          <>
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Evolução das Vendas
            </Text>
            <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <LineChart
                data={salesEvolutionChartData}
                width={screenWidth - 32}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                withHorizontalLabels={true}
                withVerticalLabels={true}
                withDots={true}
                withShadow={false}
                withInnerLines={false}
                withOuterLines={false}
              />

              {/* Resumo das vendas */}
              <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
                <View className="items-center">
                  <Text className="text-gray-500 text-xs">Total Vendas</Text>
                  <Text className="text-green-600 font-bold text-lg">
                    R${' '}
                    {salesEvolutionData
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-500 text-xs">Último Mês</Text>
                  <Text className="text-blue-600 font-bold text-lg">
                    R${' '}
                    {salesEvolutionData.length > 0
                      ? salesEvolutionData[
                          salesEvolutionData.length - 1
                        ].total.toFixed(2)
                      : '0.00'}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-500 text-xs">Média Mensal</Text>
                  <Text className="text-purple-600 font-bold text-lg">
                    R${' '}
                    {salesEvolutionData.length > 0
                      ? (
                          salesEvolutionData.reduce(
                            (sum, item) => sum + item.total,
                            0
                          ) / salesEvolutionData.length
                        ).toFixed(2)
                      : '0.00'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        {productions.length > 0 && (
          <View className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Status de Produção
            </Text>

            <View className="flex-row justify-between mb-4">
              <View className="bg-yellow-50 rounded-lg p-3 flex-1 mr-2">
                <Text className="text-yellow-800 text-xs font-medium">
                  Aguardando
                </Text>
                <Text className="text-yellow-900 text-xl font-bold">
                  {productionStats.waiting}
                </Text>
              </View>
              <View className="bg-blue-50 rounded-lg p-3 flex-1 mx-1">
                <Text className="text-blue-800 text-xs font-medium">
                  Em Produção
                </Text>
                <Text className="text-blue-900 text-xl font-bold">
                  {productionStats.inProduction}
                </Text>
              </View>
              <View className="bg-green-50 rounded-lg p-3 flex-1 ml-2">
                <Text className="text-green-800 text-xs font-medium">
                  Colhido
                </Text>
                <Text className="text-green-900 text-xl font-bold">
                  {productionStats.harvested}
                </Text>
              </View>
            </View>

            <Text className="text-base font-medium text-gray-700 mb-3">
              Produções Recentes
            </Text>
            {recentProductions.map((production, index) => (
              <View
                key={production.id}
                className="flex-row items-center justify-between py-3 border-b border-gray-100"
              >
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium" numberOfLines={1}>
                    {production.product.name}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {production.quantity}{' '}
                    {production.unit === 'unit' ? 'unidade(s)' : 'kg'}
                  </Text>
                </View>
                <View className="items-end">
                  <View
                    className={`px-2 py-1 rounded-full ${getStatusColor(
                      production.status
                    )}`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        getStatusColor(production.status).split(' ')[0]
                      }`}
                    >
                      {getStatusText(production.status)}
                    </Text>
                  </View>
                  {production.status === 'harvested' && (
                    <Text className="text-green-600 text-xs mt-1">
                      {production.quantityProduced}{' '}
                      {production.unit === 'unit' ? 'unidade(s)' : 'kg'}{' '}
                      produzidas
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
