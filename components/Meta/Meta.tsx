import Head from 'next/head'

interface MetaProps {
  canonical: string
  desc: string
  image: string
  title: string
}

const Meta: React.FunctionComponent<MetaProps> = ({
  canonical,
  desc,
  image,
  title,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={canonical} />
    </Head>
  )
}

export default Meta
