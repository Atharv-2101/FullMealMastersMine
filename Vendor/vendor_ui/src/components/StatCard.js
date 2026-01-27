//StatisticsCard
import { View, Text } from 'react-native';

export default function StatCard({ title, value }) {
  return (
    <View style={{
      width: '48%',
      padding: 15,
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      marginBottom: 10
    }}>
      <Text style={{ fontSize: 14 }}>{title}</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{value}</Text>
    </View>
  );
}