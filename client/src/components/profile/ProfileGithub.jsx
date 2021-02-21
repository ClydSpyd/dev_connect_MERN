import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import store from '../../store'

const ProfileGithub = ({ username }) => {

  const repos = useSelector(state => state.profile.repos)
  const error = useSelector(state => state.profile.error)

  useEffect(() => { store.dispatch(getGithubRepos(username)) },[])

  return (
    
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
          </h2>
       {
          error.msg ? <p>{error.msg}</p>
          
        :

          repos.length ? 
            repos.map((repo, idx) => 
              <div key={repo.id} className="repo bg-white p-1 my-1">
                <div>
                  <h4><a href={repo.html_url} target="_blank"
                    rel="noopener noreferrer">{repo.name}</a></h4>
                  <p> {repo.description} </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                    <li className="badge badge-light">Forks: {repo.forks}</li>
                  </ul>
                </div>
              </div>
            )
        :
            <h4>No repos available</h4>  
        }
    </div>
  )
}

export default ProfileGithub


// {
//   profile.repos.length ? 
//     profile.repos.map((repo, idx) => <ProfileGithub idx={idx} username={profile.githubusername} />)
// :
//     <h4>No repos available</h4>  
// }

