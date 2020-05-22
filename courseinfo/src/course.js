import React from "react"

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((acumulador, currentValue) => {
        return ({ exercises: acumulador.exercises + currentValue.exercises })
    })
    return (
        <p> <strong>Number of exercises {sum.exercises}</strong> </p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {
                course.parts.map((part, i) => { return (<Part part={part} key={i} />) })
            }
        </div>
    )
}

export default function Course({ courses }) {
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            {
                courses.map((course,i) => {
                    return (
                        <div key={i}>
                            <Header course={course} />
                            <Content course={course} />
                            <Total course={course} />
                        </div>
                    )
                })

            }
        </div>
    )
}