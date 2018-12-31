using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using React.Model;

namespace React.Managers
{
    public class ObjectiveManager
    {
        private readonly SchedulerDbContext _dbContext;
        private readonly IMapper _mapper;

        public ObjectiveManager(SchedulerDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<Objective>> GetAllAsync() =>
            await _dbContext.Objectives
                .Where(objective => !objective.Completed)
                .OrderByDescending(objective => objective.Id)
                .ToListAsync();

        public async Task<Objective> GetAsync(int id) =>
            await _dbContext.Objectives.FindAsync(id);

        public async Task<Objective> AddAsync(Objective newObjective)
        {
            _dbContext.Objectives.Add(newObjective);

            await _dbContext.SaveChangesAsync();

            return newObjective;
        }

        public async Task<Objective> Update(Objective updatedObjective)
        {
            var updatingObjective = await GetObjectiveAsync(updatedObjective.Id);

            _mapper.Map(updatedObjective, updatingObjective);

            await _dbContext.SaveChangesAsync();

            return updatingObjective;
        }

        public async Task<int> CompleteObjectiveAsync(Objective completingObjective)
        {
            var objective = await GetObjectiveAsync(completingObjective.Id);

            objective.Completed = true;

            await _dbContext.SaveChangesAsync();

            return objective.Id;
        }
        
        private async Task<Objective> GetObjectiveAsync(int id)
        {
            var objective = await _dbContext.Objectives.FindAsync(id)
                            ?? throw new ArgumentException(nameof(id));
            return objective;
        }
    }
}
