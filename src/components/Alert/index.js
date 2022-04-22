import style from "./alert.module.scss";
import css from "classnames";
import React, { useContext, useState } from "react";
import { AuthContext } from "context";

export function Alert ({ children, type, message }) {
  const [isShow, setIsShow] = useState(true);

  const renderErrorChildren = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };
  return (
    <div className={css(style.alert, style[type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>&times;</span>
      {children ? renderErrorChildren() : message}
    </div>
  );
}
