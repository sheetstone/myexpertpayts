import React from "react";
import iconSVG from "./IconMapSvg";

function Icons(props: { name: string, className?: string, onClick?: () => void }) {
  const { name,className, onClick } = props;
  const svgHtml:string = iconSVG[name];

  return <i dangerouslySetInnerHTML={{__html: svgHtml}} className={className} onClick = {onClick}/>;
}

export default Icons;
