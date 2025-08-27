'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@banking/ui'
import { Order } from '../types'
import { tradingService } from '../services/trading-service'

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newOrder, setNewOrder] = useState({
    symbol: '',
    side: 'buy' as 'buy' | 'sell',
    orderType: 'market' as 'market' | 'limit',
    quantity: '',
    price: '',
  })

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await tradingService.getOrders()
      setOrders(data)
    } catch (err) {
      console.error('Failed to load orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await tradingService.createOrder({
        symbol: newOrder.symbol.toUpperCase(),
        side: newOrder.side,
        orderType: newOrder.orderType,
        quantity: parseInt(newOrder.quantity),
        price: newOrder.orderType === 'limit' ? parseFloat(newOrder.price) : undefined,
      })
      
      setNewOrder({ symbol: '', side: 'buy', orderType: 'market', quantity: '', price: '' })
      setShowCreateForm(false)
      loadOrders()
    } catch (err) {
      console.error('Failed to create order:', err)
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    try {
      await tradingService.cancelOrder(orderId)
      loadOrders()
    } catch (err) {
      console.error('Failed to cancel order:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filled': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'New Order'}
        </Button>
      </div>

      {/* Create Order Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Symbol</label>
                  <Input
                    value={newOrder.symbol}
                    onChange={(e) => setNewOrder({ ...newOrder, symbol: e.target.value })}
                    placeholder="e.g., AAPL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Side</label>
                  <select
                    value={newOrder.side}
                    onChange={(e) => setNewOrder({ ...newOrder, side: e.target.value as 'buy' | 'sell' })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order Type</label>
                  <select
                    value={newOrder.orderType}
                    onChange={(e) => setNewOrder({ ...newOrder, orderType: e.target.value as 'market' | 'limit' })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="market">Market</option>
                    <option value="limit">Limit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <Input
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                    placeholder="100"
                    required
                  />
                </div>
                {newOrder.orderType === 'limit' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={newOrder.price}
                      onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                      placeholder="175.00"
                      required
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Order</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-lg">{order.symbol}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    <span className={`text-sm font-medium ${order.side === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                      {order.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-1 capitalize">{order.orderType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <span className="ml-1">{order.quantity.toLocaleString()}</span>
                    </div>
                    {order.price && (
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-1">${order.price.toFixed(2)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Filled:</span>
                      <span className="ml-1">{order.filledQuantity.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Created: {order.createdAt.toLocaleString()}
                  </div>
                </div>
                {order.status === 'pending' && (
                  <Button
                    onClick={() => handleCancelOrder(order.id)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {orders.length === 0 && (
          <div className="text-center p-8">
            <p className="text-gray-600">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}
