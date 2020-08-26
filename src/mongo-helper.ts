import * as mongodb from "mongodb";


export class MongoHelper {
    public static client: mongodb.MongoClient

    public static connect(url: string): Promise<mongodb.MongoClient> {
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (err, client: mongodb.MongoClient) => {
                if (err)
                    reject(err)

                MongoHelper.client = client;
                resolve(client)
            })
        })
    }
}