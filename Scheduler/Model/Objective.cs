using System;
using System.ComponentModel.DataAnnotations;

namespace React.Model
{
    public class Objective
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public bool Completed { get; set; }
    }
}