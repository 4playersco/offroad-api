import type { Request, Response } from "express";
import fetch from "node-fetch";
import { Buffer } from "buffer";

import { formatError } from "@/lib";

export const getDocs = async (
  req: Request,
  res: Response<User[] | ResponseError>,
) => {
  // console.log("getDocs start");
  // Authorize
  const clientIdAndSecret = `${process.env.BACKBLAZE_DOCS_KEY_ID}:${process.env.BACKBLAZE_DOCS_APP_KEY}`;
  const base64 = Buffer.from(clientIdAndSecret).toString("base64");

  try {
    const authResp = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      },
    );

    const authJson = await authResp.json();
    const { authorizationToken, apiUrl, downloadUrl, allowed } = authJson;
    const prefix = "bylaws/";
    const body = {
      bucketId: allowed.bucketId,
      prefix,
    };

    // res.send(authJson);
    // console.log("list body", body);

    // Get file names in bucket
    const listResp = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names`, {
      method: "POST",
      headers: { Authorization: authorizationToken },
      body: JSON.stringify(body),
    });

    // const listJson = await listResp.json();
    const listJson = await listResp.json();
    const { files } = listJson;
    const { fileName, fileId } = files[0];

    res.status(200).json(listJson);

    // const fullDownloadUrl = `${downloadUrl}/b2api/v2/b2_download_file_by_id?fileId=${fileId}`;

    // console.log("getDocs end");
    // res.send({ name: fileName.replace(prefix, ""), url: fullDownloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: [formatError(error)] });
  }
};
