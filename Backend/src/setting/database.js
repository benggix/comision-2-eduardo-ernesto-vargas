import { connect } from "mongoose"
import { config } from "./config.js";


export const startConnection = async () => {
    try {
        const db = await connect(config.mongo_uri)
        console.log(`db es connected to: ${db.connection.name}`);
    } catch (error) {
        console.log("db is not connected", error);
    }
}