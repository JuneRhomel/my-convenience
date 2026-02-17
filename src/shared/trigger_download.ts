// download.client.ts
"use client";

export function triggerDownload(
    fileData: ArrayBuffer,
    filename: string
) {
    const blob = new Blob([fileData]);

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
}
