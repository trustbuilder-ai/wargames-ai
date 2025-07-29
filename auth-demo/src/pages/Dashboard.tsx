import React, { useState } from 'react'
import { useApiData, usePaginatedData } from '../hooks'
import { ProtectedCard } from '../components/ProtectedCard'
import { DataCard } from '../components/DataCard'
import { 
  healthCheckHealthCheckGet,          // Public: ${BACKEND_URL}/health_check
  listTournamentsTournamentsGet,      // Public: ${BACKEND_URL}/tournaments
  getCurrentUserInfoUsersMeGet,       // Protected: ${BACKEND_URL}/users/me
  listBadgesBadgesGet,               // Protected: ${BACKEND_URL}/badges
  listChallengesChallengesGet        // Public: ${BACKEND_URL}/challenges
} from '../backend_client/sdk.gen'
import type { SelectionFilter } from '../backend_client/types.gen'
import { BACKEND_URL } from '../config'
import './Dashboard.css'

export function Dashboard() {
  const [tournamentFilter, setTournamentFilter] = useState<SelectionFilter>('ACTIVE')

  // PUBLIC DATA - No authentication required
  
  // Health check - hits https://wargames-ai-backend-357559285333.us-west1.run.app/health_check
  const healthStatus = useApiData(healthCheckHealthCheckGet)

  // Simple public data fetch - hits ${BACKEND_URL}/tournaments
  const allTournaments = useApiData(listTournamentsTournamentsGet)

  // Public data with pagination - hits ${BACKEND_URL}/tournaments?page_index=0&count=10
  const paginatedTournaments = usePaginatedData(listTournamentsTournamentsGet, {
    pageSize: 10,
    initialParams: {
      query: {
        selection_filter: tournamentFilter
      }
    }
  })

  // Public data with manual parameter control - hits ${BACKEND_URL}/challenges?tournament_id=1&page_index=0&count=20
  const challenges = useApiData(listChallengesChallengesGet, {
    initialParams: {
      query: {
        tournament_id: 1,
        page_index: 0,
        count: 20
      }
    }
  })

  // PROTECTED DATA - Requires authentication
  
  // Simple protected data - hits ${BACKEND_URL}/users/me with Authorization header
  const userInfo = useApiData(getCurrentUserInfoUsersMeGet, {
    requiresAuth: true
  })

  // Protected data with parameters - hits ${BACKEND_URL}/badges?user_badges_only=true
  const userBadges = useApiData(listBadgesBadgesGet, {
    requiresAuth: true,
    initialParams: {
      query: {
        user_badges_only: true
      }
    }
  })

  // Protected data with pagination - hits ${BACKEND_URL}/badges?user_badges_only=true&page_index=0&count=5
  const paginatedUserBadges = usePaginatedData(listBadgesBadgesGet, {
    requiresAuth: true,
    pageSize: 5,
    initialParams: {
      query: {
        user_badges_only: true
      }
    }
  })

  // Dynamic parameter updates (fully typed!)
  const handleFilterChange = (newFilter: SelectionFilter) => {
    setTournamentFilter(newFilter)
    paginatedTournaments.updateParams({
      query: {
        selection_filter: newFilter, // TypeScript knows this field exists
        page_index: 0,               // Reset to first page
        count: 10
      }
    })
  }

  return (
    <div className="dashboard-page">
      <h1>Wargames Dashboard</h1>
      
      {/* API Status Banner */}
      <div className="api-status">
        <DataCard {...healthStatus} className="health-banner">
          {(data) => (
            <span className={`status ${data.status === 'ok' ? 'ok' : 'error'}`}>
              API Status: {data.status} | Backend: {BACKEND_URL}
            </span>
          )}
        </DataCard>
      </div>

      {/* PUBLIC SECTION - Always visible */}
      <section className="public-section">
        <h2>Public Information</h2>

        {/* Filter controls */}
        <div className="filters">
          <label>Tournament Status:</label>
          {(['ACTIVE', 'FUTURE', 'PAST'] as const).map(filter => (
            <button 
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={tournamentFilter === filter ? 'active' : ''}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Paginated public data from ${BACKEND_URL}/tournaments */}
        <DataCard 
          {...paginatedTournaments} 
          title="Tournaments"
          className="tournaments-list"
        >
          {(data) => (
            <>
              <div className="tournament-grid">
                {data.map(tournament => (
                  <div key={tournament.id} className="tournament-item">
                    <h3>{tournament.name}</h3>
                    <p className="status">Status: <span className={tournament.status}>{tournament.status}</span></p>
                    <p>Starts: {new Date(tournament.start_date).toLocaleDateString()}</p>
                    {tournament.end_date && (
                      <p>Ends: {new Date(tournament.end_date).toLocaleDateString()}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pagination">
                <button 
                  onClick={paginatedTournaments.prevPage}
                  disabled={!paginatedTournaments.hasPrevPage}
                >
                  Previous
                </button>
                <span>Page {paginatedTournaments.currentPage + 1}</span>
                <button 
                  onClick={paginatedTournaments.nextPage}
                  disabled={!paginatedTournaments.hasNextPage}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </DataCard>

        {/* Simple public data from ${BACKEND_URL}/challenges */}
        <DataCard {...challenges} title="Latest Challenges">
          {(data) => (
            <div className="challenges-list">
              {data.map(challenge => (
                <div key={challenge.id} className="challenge-item">
                  <h4>{challenge.name}</h4>
                  {challenge.description && <p>{challenge.description}</p>}
                  {challenge.tools_available && (
                    <p className="tools">Tools: {challenge.tools_available}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </DataCard>
      </section>

      {/* PROTECTED SECTION - Only visible when authenticated */}
      <ProtectedCard className="user-section">
        <h2>Your Profile</h2>

        {/* Simple protected data from ${BACKEND_URL}/users/me */}
        <DataCard {...userInfo} title="Account Info">
          {(data) => (
            <div className="user-info">
              <p><strong>Username:</strong> {data.username}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Member since:</strong> {new Date(data.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </DataCard>

        {/* Paginated protected data from ${BACKEND_URL}/badges */}
        <DataCard {...paginatedUserBadges} title="Your Badges">
          {(data) => (
            <>
              <div className="badges-grid">
                {data.map(badge => (
                  <div key={badge.id} className="badge-card">
                    {badge.icon_url && <img src={badge.icon_url} alt={badge.name} />}
                    <h4>{badge.name}</h4>
                    {badge.description && <p>{badge.description}</p>}
                    {badge.earned_at && (
                      <small>Earned: {new Date(badge.earned_at).toLocaleDateString()}</small>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pagination">
                <button 
                  onClick={paginatedUserBadges.prevPage}
                  disabled={!paginatedUserBadges.hasPrevPage}
                >
                  ←
                </button>
                <span>Page {paginatedUserBadges.currentPage + 1}</span>
                <button 
                  onClick={paginatedUserBadges.nextPage}
                  disabled={!paginatedUserBadges.hasNextPage}
                >
                  →
                </button>
              </div>
            </>
          )}
        </DataCard>

        {/* Manual parameter control example */}
        <div className="actions">
          <button 
            onClick={() => {
              userBadges.refetch({
                query: {
                  user_badges_only: true,
                  page_index: 0,
                  count: 50  // Load more badges
                }
              })
            }}
            className="load-all-btn"
          >
            Load All Badges
          </button>
        </div>
      </ProtectedCard>
    </div>
  )
}

export default Dashboard