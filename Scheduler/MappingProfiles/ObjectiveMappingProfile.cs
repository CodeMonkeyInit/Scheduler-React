using AutoMapper;
using React.Model;

namespace React.MappingProfiles
{
    public class ObjectiveMappingProfile : Profile
    {
        public ObjectiveMappingProfile()
        {
            CreateMap<Objective, Objective>()
                .ForMember(objective => objective.Id, opt => opt.Ignore())
                .ForMember(objective => objective.Created, opt => opt.Ignore())
                .ForMember(objective => objective.Completed, opt => opt.Ignore());
        }
    }
}
