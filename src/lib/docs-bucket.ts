import fetch from "node-fetch";
import { Buffer } from "buffer";
// import e from "express";
import { getMonth, getYear } from "date-fns";
import { timezoneOffsetInMs } from "../constants";

const getDocsAuthorization = async () => {
  const clientIdAndSecret = `${process.env.BACKBLAZE_DOCS_KEY_ID}:${process.env.BACKBLAZE_DOCS_APP_KEY}`;
  const base64 = Buffer.from(clientIdAndSecret).toString("base64");

  try {
    const authResp = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }
    );

    const authJson = await authResp.json();
    const { authorizationToken, apiUrl, downloadUrl, allowed } = authJson;

    return {
      authorizationToken,
      apiUrl,
      downloadUrl,
      bucketId: allowed.bucketId,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Unable to obtain authorization on docs service");
  }
};

const getFiles = async (
  apiUrl: string,
  authToken: string,
  bucketId: string,
  downloadUrl: string,
  prefix: string
) => {
  const body = {
    bucketId,
    prefix,
  };

  try {
    const listResp = await fetch(`${apiUrl}/b2api/v2/b2_list_file_names`, {
      method: "POST",
      headers: { Authorization: authToken },
      body: JSON.stringify(body),
    });

    const listJson = await listResp.json();
    const { files } = listJson;

    return files
      .map((file: any) => {
        const name = removePrefix(file.fileName, prefix);

        return {
          date: getFileDate(name),
          name: getFileName(name),
          link: getDownloadLink(downloadUrl, file.fileId),
        };
      })
      .sort((a: any, b: any) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
  } catch (e) {
    console.error(e);
    throw new Error("Unable to retrieve file names from docs service");
  }
};

const removePrefix = (fileName: string, prefix: string) =>
  fileName.replace(prefix, "");

const getFileName = (fileName: string) => {
  // ex: 2017-08-01_File-Name
  const [date, snakeName] = fileName.split("_");

  return snakeName
    .split("-")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

const getFileDate = (fileName: string) => {
  // ex: 2017-08-01_File-Name
  const [date] = fileName.split("_");
  const newDate = new Date(date);
  // Adjusted for GMT
  newDate.setTime(newDate.getTime() + timezoneOffsetInMs);

  return newDate;
};

const getDownloadLink = (urlPrefix: string, fileId: string) =>
  `${urlPrefix}/b2api/v2/b2_download_file_by_id?fileId=${fileId}`;

export const getSingleFile = async (prefix: string) => {
  try {
    const { authorizationToken, apiUrl, downloadUrl, bucketId } =
      await getDocsAuthorization();

    const [file] = await getFiles(
      apiUrl,
      authorizationToken,
      bucketId,
      downloadUrl,
      prefix
    );

    return file;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to retrieve file from docs service");
  }
};

export const getAllFiles = async (prefix: string) => {
  try {
    const { authorizationToken, apiUrl, downloadUrl, bucketId } =
      await getDocsAuthorization();

    return getFiles(apiUrl, authorizationToken, bucketId, downloadUrl, prefix);
  } catch (e) {
    console.error(e);
    throw new Error("Unable to retrieve files from docs service");
  }
};

const detailDocs = (docs: any[], label: string) =>
  docs.map((doc) => {
    const year = getYear(doc.date).toString();
    const month = getMonth(doc.date).toString();

    return {
      ...doc,
      label,
      year,
      month,
    };
  });

const zipDocsTogether = (minutes: any[], newsletters: any[]) =>
  [...minutes, ...newsletters].reduce((acc, { year, month, label, ...doc }) => {
    // Check year and archives
    if (acc[year] && acc[year]) {
      // Check month
      if (acc[year][month]) {
        // Add
        acc[year][month][label] = doc;
      } else {
        // Create month, add docs
        acc[year][month] = {
          [label]: doc,
        };
      }
    } else {
      // Create year, month, add docs
      acc[year] = {
        [month]: {
          [label]: doc,
        },
      };
    }

    return acc;
  }, {});

const formatAndSortDocs = (archives: any) =>
  Object.entries(archives)
    .map(([year, monthlyArchives]: [string, any]) => {
      // Format and sort by month
      const results = Object.entries(monthlyArchives)
        .map(([month, docs]: [string, any]) => {
          return {
            month,
            ...docs,
          };
        })
        .sort((a, b) => (+a.month > +b.month ? 1 : -1));

      return {
        year: year,
        monthlyArchives: results,
      };
    })
    .sort((a, b) => (+a.year < +b.year ? 1 : -1));

export const formatArchives = (minutes: any, newsletters: any) => {
  const minutesFiltered = detailDocs(minutes, "meetingMinutes");
  const newslettersFiltered = detailDocs(newsletters, "newsletter");

  const archivesFiltered = zipDocsTogether(
    minutesFiltered,
    newslettersFiltered
  );

  const yearlyArchives = formatAndSortDocs(archivesFiltered);

  return yearlyArchives;
};
