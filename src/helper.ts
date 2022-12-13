import axios from "axios";

export async function getFolderContents(id: any): Promise<any> {
  const folderId = id.queryKey[1];
  try {
    console.log(id.queryKey[1]);

    const { data, status } = await axios.get(
      `/hubs/b.c65ce02f-8304-4d1d-8684-e55abb2f54a0/projects/b.79a6bff3-34b1-435f-8964-282f78ae1ef5/contents?folder_id=${folderId}`,

      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return data.folder;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
    }
    throw error;
  }
}

export const transformData = (data = []) => {
  return data.map((i: any) => {
    if (i.type === "folders") {
      return {
        type: i.type,
        id: i.id,
        name: i.attributes.name,
      };
    } else {
      return {
        type: i.type,
        id: i.id,
        name: i.attributes.displayName,
      };
    }
  }) as any;
};
