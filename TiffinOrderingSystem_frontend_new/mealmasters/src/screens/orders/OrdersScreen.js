import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { getVendorOrders } from '../../services/vendor'
import { useFocusEffect } from '@react-navigation/native'

/* ================= STATUS TABS ================= */
const STATUS_TABS = [
  'ALL',
  'PENDING',
  'APPROVED',
  'DELIVERED',
  'CANCELLED'
]

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('ALL')

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    applyFilter(activeStatus)
  }, [activeStatus, orders])

  /* ================= LOAD ORDERS ================= */
  const loadOrders = async () => {
    const result = await getVendorOrders()

    if (result?.status === 'success') {
      setOrders(result.data)
      setFilteredOrders(result.data)
    } else {
      setOrders([])
      setFilteredOrders([])
    }
    setLoading(false)
  }

  /* ================= FILTER ================= */
  const applyFilter = (status) => {
    if (status === 'ALL') {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(
        orders.filter(
          o => o.status?.toUpperCase() === status
        )
      )
    }
  }

  /* ================= STATUS COLOR ================= */
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED': return '#2E7D32'
      case 'APPROVED': return '#1976D2'
      case 'PENDING': return '#FF7A00'
      case 'CANCELLED': return 'red'
      default: return '#555'
    }
  }

  /* ================= RENDER ORDER ================= */
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Order Details */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OrderDetails', {
            orderId: item.order_id
          })
        }
      >
        <View style={styles.row}>
          <Text style={styles.customer}>{item.customer_name}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>

        <Text style={styles.text}>🍱 {item.tiffin_name}</Text>
        <Text style={styles.text}>📦 Plan: {item.plan_type}</Text>
        <Text style={styles.date}>
          📅 {item.start_date} → {item.end_date}
        </Text>
      </TouchableOpacity>

      {/* 🔥 ASSIGN DELIVERY (ONLY IF PENDING) */}
      {item.status?.toUpperCase() === 'PENDING' && (
        <TouchableOpacity
          style={styles.assignBtn}
          onPress={() =>
            navigation.navigate('AssignDelivery', {
              orderId: item.order_id
            })
          }
        >
          <Ionicons name="bicycle" size={16} color="#fff" />
          <Text style={styles.assignText}>Assign Delivery Partner</Text>
        </TouchableOpacity>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <LinearGradient colors={['#FF9F43', '#FF7A00']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Vendor Orders</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      {/* ================= STATUS TABS ================= */}
      <View style={styles.tabs}>
        {STATUS_TABS.map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.tab,
              activeStatus === status && styles.activeTab
            ]}
            onPress={() => setActiveStatus(status)}
          >
            <Text
              style={[
                styles.tabText,
                activeStatus === status && styles.activeTabText
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================= LIST ================= */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF7A00"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.order_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No {activeStatus.toLowerCase()} orders
            </Text>
          }
        />
      )}
    </View>
  )
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E8'
  },

  header: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  },

  /* TABS */
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20
  },

  activeTab: {
    backgroundColor: '#FF7A00'
  },

  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555'
  },

  activeTabText: {
    color: '#fff'
  },

  /* CARD */
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#000'
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  customer: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  text: {
    fontSize: 14,
    marginTop: 4
  },

  date: {
    fontSize: 12,
    marginTop: 6,
    color: '#555'
  },

  /* ASSIGN DELIVERY */
  assignBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8
  },

  assignText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 13
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777'
  }
})
