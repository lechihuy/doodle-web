import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, set } from "firebase/database"

const firebaseConfig = {
  databaseURL: "https://doodle-bfa18-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

async function fetchRealtimeOrdersTracking(callback: CallableFunction) {
  const orderTracking = ref(db, `/order-trackings`)
  return onValue(orderTracking, (snapshot) => callback(snapshot))
}

async function changeRealtimeOrderTracking(code: string, status: string) {
  await set(ref(db, `/order-trackings/${code}`), {
    status
  })
}

async function fetchRealtimeOrderTracking(code: string, callback: CallableFunction) {
  const orderTracking = ref(db, `/order-trackings/${code}`)
  return onValue(orderTracking, (snapshot) => callback(snapshot))
}


export { fetchRealtimeOrdersTracking, changeRealtimeOrderTracking, fetchRealtimeOrderTracking }
