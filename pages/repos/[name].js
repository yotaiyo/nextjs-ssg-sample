import fetch from 'isomorphic-unfetch'

function repos({ json }) {
  return <div>Repo Url: {json.url}</div>
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USER_NAME}/repos?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          Accept: 'application/vnd.github.mercy-preview+json'
      }
    }
  );

  const repos = await res.json();

  const paths = repos.map(repo => `/repos/${repo.name}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const name = params.name
  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USER_NAME}/${name}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          Accept: 'application/vnd.github.mercy-preview+json'
      }
    }
  );

  const json = await res.json();

  return {
    props: {
      json
    }
  }
}

export default repos