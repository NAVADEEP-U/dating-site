"use client"

import { useState } from "react"

type User = {
  id: string
  name: string
  gender: "male" | "female"
  interestedIn: "male" | "female"
  interests: string[]
  distance: number
}

const users: User[] = [
  {
    id: "1",
    name: "Priya",
    gender: "female",
    interestedIn: "male",
    interests: ["music", "travel"],
    distance: 10,
  },
  {
    id: "2",
    name: "Rahul",
    gender: "male",
    interestedIn: "female",
    interests: ["sports", "movies"],
    distance: 25,
  },
  {
    id: "3",
    name: "Anjali",
    gender: "female",
    interestedIn: "female",
    interests: ["music", "art"],
    distance: 5,
  },
  {
    id: "4",
    name: "Kiran",
    gender: "male",
    interestedIn: "female",
    interests: ["travel", "fitness"],
    distance: 40,
  },
]

const currentUser: User = {
  id: "100",
  name: "Navadeep",
  gender: "male",
  interestedIn: "female",
  interests: ["music", "travel"],
  distance: 0,
}

export default function Home() {
  const [maxDistance, setMaxDistance] = useState(50)
  const [selectedInterest, setSelectedInterest] = useState("")

  const filteredUsers = users.filter((user) => {
    const reciprocal =
      currentUser.interestedIn === user.gender &&
      user.interestedIn === currentUser.gender

    const commonInterest = currentUser.interests.some((interest) =>
      user.interests.includes(interest)
    )

    return (
      user.id !== currentUser.id &&
      reciprocal &&
      commonInterest &&
      user.distance <= maxDistance &&
      (selectedInterest === "" ||
        user.interests.includes(selectedInterest))
    )
  })

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Dating App</h1>

      <h2>Filters</h2>

      <label>
        Max Distance (km):
        <input
          type="number"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <label>
        Interest:
        <select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
        >
          <option value="">All</option>
          <option value="music">Music</option>
          <option value="travel">Travel</option>
          <option value="sports">Sports</option>
          <option value="movies">Movies</option>
          <option value="art">Art</option>
          <option value="fitness">Fitness</option>
        </select>
      </label>

      <hr />

      <h2>Matches</h2>

      {filteredUsers.length === 0 && <p>No matches found.</p>}

      {filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{user.name}</h3>
          <p>Gender: {user.gender}</p>
          <p>Distance: {user.distance} km</p>
          <p>Interests: {user.interests.join(", ")}</p>
        </div>
      ))}
    </div>
  )
}
