export default function SpotifyPage()
{
    return(
    <div className="bg-background text-foreground"
    style={{ 
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        <h1>This is the Spotify</h1>
        <p className="text-muted-foreground">With subtitle</p>
    </div>)
}