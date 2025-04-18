import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: PropsWithChildren) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};
