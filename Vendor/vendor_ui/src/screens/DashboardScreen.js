import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://YOUR_SERVER_IP:PORT';

export default function DashboardScreen() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = 'JWT_TOKEN_HERE'; // store in AsyncStorage later

      const response = await axios.get(`${BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // backend returns: result.createResult(err, data)
      setOrders(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status !== 'DELIVERED').length;
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;

  return (
    <View style={{ padding: 15 }}>
      <Text style={{ fontSize: 22 }}>Vendor Dashboard</Text>

      <Text>Total Orders: {totalOrders}</Text>
      <Text>Pending Orders: {pendingOrders}</Text>
      <Text>Delivered Orders: {deliveredOrders}</Text>

      <Text style={{ marginTop: 15 }}>Recent Orders</Text>

      <FlatList
        data={orders.slice(0, 3)}
        keyExtractor={item => item.order_id.toString()}
        renderItem={({ item }) => (
          <Text>
            #{item.order_id} - {item.customer_name} ({item.status})
          </Text>
        )}
      />
    </View>
  );
}
