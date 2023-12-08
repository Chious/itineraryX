import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";

export default function Dropzone({ file, setFile, updateIcon, setUpdateIcon }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFile((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  useEffect(() => {
    if (file?.length) {
      console.log(file);
    }
  }, [file]);

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/jpeg": [".jpeg", ".png"] },
    maxFiles: 2,
    onDrop,
    noClick: true,
  });

  //Update icon
  useEffect(() => {
    if (updateIcon) {
      open();
    }

    return () => {
      setUpdateIcon(false);
    };
  }, [updateIcon]);

  const [isDrag, setIsDrag] = useState(false);
  //Style
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDrag(true);
    } else if (e.type === "dragleave") {
      setIsDrag(false);
    }
  };

  const handleDrop = (e) => {
    setIsDrag(false);
  };

  return (
    <>
      <section
        className="container"
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        style={{
          visibility: isDrag ? "visible" : "hidden",
          position: "absolute",
          width: "300px",
          height: "200px",
          zIndex: 10,
        }}
      >
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            background: isDrag ? "gray" : "transparent",
            height: "100%",
            width: "100%",
          }}
        >
          <input {...getInputProps()} />
          <p
            style={{
              color: isDrag ? "green" : "transparent",
            }}
          >
            (2 files are the maximum number of files you can drop here)
          </p>
        </div>
      </section>
    </>
  );
}
