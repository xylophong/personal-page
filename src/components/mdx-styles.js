import * as React from "react"
import Marginnote from "./marginnote"

const MDXStyles = () => {
  const classNamesReplacements = {
    "katex": "katex text-xl w-full",
    "katex-html": "katex-html w-full py-3 overflow-x-auto overflow-y-visible",
    "table-wrapper": "table-wrapper block overflow-x-auto w-full my-4",
    "grvsc-container": "grvsc-container my-4 rounded-md pre-header-sibling:mt-0 pre-header-sibling:rounded-tl-none pre-header-sibling:rounded-tr-none",
    "gatsby-code-title gatsby-remark-code-title": "gatsby-code-title gatsby-remark-code-title py-1.5 px-4 w-full font-mono text-xs rounded-tl-md rounded-tr-md relative inline-block bg-current-pre-header text-current-bg",
    // "gatsby-image-wrapper": "gatsby-image-wrapper rounded-md"
    // "gatsby-resp-image-wrapper": "gatsby-resp-image-wrapper rounded-md max-w-full mb-6",
    // "gatsby-resp-image-link": "gatsby-resp-image-link rounded-md max-w-full",
    // "gatsby-resp-image-image": "gatsby-resp-image-image rounded-md max-w-full",
    // "gatsby-resp-image-background-image": "gatsby-resp-image-background-image rounded-md max-w-full",
  }

  const recursiveMap = (children, fn) => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if (child.props.children) {
        child = React.cloneElement(child, {
          children: recursiveMap(child.props.children, fn)
        });
      }
      return fn(child);
    });
  }
  
  const replaceClassName = (classNamesReplacements) => {
    return (child) => {
      if (classNamesReplacements.hasOwnProperty(child.props.className)) {
        console.log(child)
        return React.cloneElement(child, {
          className: classNamesReplacements[child.props.className]
        })
      } else if (child.props.mdxType === "GatsbyImage") {
        return React.cloneElement(child, {
          className: "rounded-md"
        })
      } else {
        return child
      }
    }
  }

  return({
    table: props => <table {...props} className="border-collapse m-auto text-tufte-margin my-2" />,
    th: props => <th {...props} className="relative border border-solid border-current-text p-2 text-left" />,
    td: props => <td {...props} className="relative border border-solid border-current-text p-2 text-left" />,
    wrapper: ({children, ...props}) => {
      return <>{ recursiveMap(children, replaceClassName(classNamesReplacements)) }</>
    },
    Marginnote: props => <Marginnote {...props} />
  }) 
}

export default MDXStyles