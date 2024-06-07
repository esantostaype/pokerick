'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPokemonTypes } from '@/services/pokeApi';

export const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [debouncedType, setDebouncedType] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTypes = async () => {
      const fetchedTypes = await getPokemonTypes();
      setTypes(fetchedTypes);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setDebouncedType(type);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, type]);

  useEffect(() => {
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    if (q !== null) {
      setQuery(q);
    }
    if (type !== null) {
      setType(type);
    }
  }, [searchParams]);

  useEffect(() => {
    const queryString = new URLSearchParams();
    if (debouncedQuery) {
      queryString.set('q', debouncedQuery);
    }
    if (debouncedType) {
      queryString.set('type', debouncedType);
    }
    
    router.replace(`/search?${queryString.toString()}`)
  }, [debouncedQuery, debouncedType, router]);

  return (
    <form>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Pokémon"
      />
      <select value={type} onChange={(e) => { setType(e.target.value); setSelectedType(e.target.value); }}>
        <option value="">Select Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </form>
  );
};