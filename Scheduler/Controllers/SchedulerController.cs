using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using React.Managers;
using React.Model;

namespace React.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchedulerController : Controller
    {
        private readonly ObjectiveManager _objectiveManager;

        public SchedulerController(ObjectiveManager objectiveManager)
        {
            _objectiveManager = objectiveManager;
        }

        [HttpGet]
        public async Task<IEnumerable<Objective>> GetAllAsync() =>
            await _objectiveManager.GetAllAsync();

        [HttpGet("{id}")]
        public async Task<Objective> GetAsync(int id) =>
            await _objectiveManager.GetAsync(id);

        [HttpPost]
        public async Task<Objective> AddAsync(Objective newObjective) =>
            await _objectiveManager.AddAsync(newObjective);

        [HttpPut]
        public async Task<Objective> UpdateAsync(Objective objective) =>
            await _objectiveManager.Update(objective);

        [HttpDelete]
        public async Task<int> RemoveAsync(Objective removingObjective) =>
            await _objectiveManager.CompleteObjectiveAsync(removingObjective);

    }
}