'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPokemonTypes } from '@/services/pokeApi';
import { Formik, Form, Field } from 'formik';
import { SearchAction } from '@/actions/search-action';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';

interface FormValues {
  query: string;
  type: string;
}

export const SearchFormFormik = () => {
  const searchParams = useSearchParams();
  const [types, setTypes] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({ query: '', type: '' });
  const [values, setValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    const fetchTypes = async () => {
      const fetchedTypes = await getPokemonTypes();
      setTypes(fetchedTypes);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || '';
    setInitialValues({ query, type });
    setValues({ query, type });
  }, [searchParams]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSubmit(values);
    }, 300);
  
    return () => {
      clearTimeout(handler);
    };
  }, [values, values.query, values.type]); // Only run this effect when the query value changes

  const handleSubmit = async (values: FormValues) => {
    const query = values.query;
    const type = values.type;
    await SearchAction(type, query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTypeChange = async (e: SelectChangeEvent<string>, setFieldValue: any) => {
    const value = e.target.value as string;
    setFieldValue('type', value);
    const newValues = {
      ...values,
      type: value,
    };
    setValues(newValues);
    await handleSubmit(newValues);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className='search-form'>
          <TextField
            type="text"
            name="query"
            placeholder="Search Pokémon"
            value={values.query}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQueryChange(e, setFieldValue)}
            sx={{ minWidth: 240, fontSize: '14px' }}
            InputProps={{
              startAdornment: <i className='fi fi-rr-search search-form__icon'></i>
            }}
          />
          <Select
            value={values.type || 'Any Types'}
            onChange={(e: SelectChangeEvent<string>) => handleTypeChange(e, setFieldValue)}
            placeholder='Any Types'
              sx={{ minWidth: 240, textTransform: 'capitalize' }} size="small"
          >
            {types.map((type) => (
              <MenuItem key={type} value={type} sx={{ textTransform: 'capitalize' }}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Form>
      )}
    </Formik>
  );
};
