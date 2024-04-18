'use client'
export default function ErrorPage({error}: {
    error: Error,
}): JSX.Element {
    return (
        <div id="error">{error.name}: {error.message}</div>
    )
}