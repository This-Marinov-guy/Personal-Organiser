import React from 'react'
import ProjectList from '../components/Projects/ProjectList'

const DUMMY_PROJECTS = [
  {
    id: "p1",
    title: "My bug business",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p2",
    title: "My bug business",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p3",
    title: "Lovely",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p4",
    title: "Hello",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p5",
    title: "Hello",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
  {
    id: "p6",
    title: "Lovely",
    description: "A very cool and stinky one",
    image:
      "https://i.pinimg.com/originals/61/e3/55/61e3552467f1f697195b9ea9b07c9cd5.jpg",
  },
];

const Projects = () => {
  return (
    <ProjectList target={DUMMY_PROJECTS} heading={'All Projects'}/>
  )
}

export default Projects