import fetch from 'isomorphic-unfetch'

function repos({ repos }) {
  return <div>Repo Name: {repos[0].name}</div>
}

export async function getStaticProps() {
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

  return {
    props: {
      repos
    }
  }
}

export default repos