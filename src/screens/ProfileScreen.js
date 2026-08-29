import { View, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../constants/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileCard
        name="Anthony Marte"
        role="Fundador · TaskFlow"
        image="https://ui-avatars.com/api/?name=Anthony+Marte&background=4C1D95&color=fff&size=200"
      />
      <ProfileCard
        name="María Fernández"
        role="Colaboradora"
        image="https://ui-avatars.com/api/?name=Maria+Fernandez&background=A78BFA&color=fff&size=200"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    gap: 16,
  },
});
