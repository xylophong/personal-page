import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const About = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="About" />
      <section className="md:w-tufte-main">
        <h2>About... this website</h2>
        <p>
          This website is a playground to explore basic ideas and web development tools while I learn them. The current version you're looking at is based on the following {"{"} frameworks, languages, principles {"}"}:
        </p>
        <ul>
          <li>Language and frontend framework: JavaScript, <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a></li>
          <li>Static site generator: <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer">Gatsby</a></li>
          <li>CSS framework: <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a></li>
          <li>Typography and styling: <a href="https://edwardtufte.github.io/tufte-css/" target="_blank" rel="noreferrer">Tufte CSS</a> by Dave Liepmann, adapted to Tailwind CSS</li>
          <li>Build/deploy: <a href="https://netlify.com/" target="_blank" rel="noreferrer">Netlify</a></li>
        </ul>
      </section>
    </Layout>
  )
}

export default About