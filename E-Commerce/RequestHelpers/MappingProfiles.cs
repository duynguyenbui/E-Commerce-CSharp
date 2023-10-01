using AutoMapper;
using E_Commerce.DTOs;
using E_Commerce.Entities;

namespace E_Commerce.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
    }
}