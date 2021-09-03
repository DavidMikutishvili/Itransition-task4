using System.Collections.Generic;

namespace CollectionBoxWebApi.DataLayer.Repositories
{
    public interface IGenericRepository<T> where T : class 
    {
        IEnumerable<T> GetAll(); 
        T GetById(int id); 
        void Create(T item); 
        void Update(T item); 
        void Delete(string id);
    }
}
