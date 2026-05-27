export default function TasksPage()
{
    return(
    <div className="bg-background text-foreground p-2">
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Tasks (scrollable)</h1>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="bg-card text-card-foreground"
          style={{
            padding: '16px',
            marginBottom: '8px',
            borderRadius: '8px'
          }}>
            Task item {i + 1}
          </div>
        ))}
      </div>
    )
}