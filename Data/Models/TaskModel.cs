namespace todolist_api.Data.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Term { get; set; }
        public string Priority { get; set; }
        public bool IsDone { get; set; }
    }
}
