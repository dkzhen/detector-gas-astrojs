import { getDatabase, ref, child, set, onValue, get, update } from "firebase/database";
import { app } from "@firebase/Client";

const db = getDatabase(app);

export async function writeLimit(limitUpload: any, id: string): Promise<void> {
  try {
    const dbRef = ref(db);
    get(child(dbRef, `limit/${id}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const updates: any = {};
          updates["/limit/" + id] = limitUpload;
          await update(ref(db, "/"), updates);
        } else {
          console.log("No data available");
          await set(ref(db, "limit/" + id), {
            limit: limitUpload,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Terjadi kesalahan saat menulis data:", error);
  }
}

export async function getLimit(id: string): Promise<any> {
  const starCountRef = ref(db, "limit/" + id);

  return new Promise((resolve, reject) => {
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject(new Error("Data not found"));
      }
    });
  });
}
