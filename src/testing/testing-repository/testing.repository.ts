import { blogCollection } from "../../db/mongodb";
import { postCollection } from "../../db/mongodb";

export const testingRepository = {
  async deleteAllData(): Promise<void> {
    await blogCollection.deleteMany({});
    await postCollection.deleteMany({});
  },
};
