import React, { useEffect, useState } from 'react';
import { InfoCard } from '../../Components/InfoCard';
import { CircularProgress, Grid, InputAdornment, OutlinedInput, MenuItem, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import './artistas.css';
import useArtist from '../../contexts/artists';
import { useHistory } from 'react-router-dom';
import { Filter } from '../../Components/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Artistas() {
    const navigate = useHistory();
    const {
        artists,
        getPaginatedArtists,
        isLoading,
        totalPages,
        filterLetters,
        currentPage,
        filterTypes,
        changePage,
        setCurrentArtist,
        selectedLetter,
        querySearchArtist,
        typeSearchArtist
    } = useArtist();

    const [selectedDropdownFilter, setSelectedDropdownFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        getPaginatedArtists();
    }, []);

    const handlePagination = (e, page) => {
        changePage(page, selectedLetter);
    }

    const goToArtist = (id) => {
        const artist = artists.filter(artist => artist.publicId == id);
        setCurrentArtist(artist);
        navigate.push(`/artista/${id}`);
    }

    const handleSelectChange = (el) => {
        setSelectedDropdownFilter(el.target.value);

        typeSearchArtist(el.target.value);
    }

    const searchArtists = (el) => {
        setSearchQuery(el.currentTarget.value);

        if(el.keyCode === 13 && searchQuery) {
            querySearchArtist(searchQuery);
        } else if(el.keyCode === 13 && searchQuery == "") {
            getPaginatedArtists();
        }
    }

    return (
        isLoading
            ? (
                <div className='loading_all'>
                    <CircularProgress style={{ color: '#D60000' }} />
                </div>
            )
            : (
                <section className='artistas_main'>
                    <Filter letters={filterLetters} filterFunction={getPaginatedArtists} />
                    <div className='more-filters'>
                        <Select
                            value={selectedDropdownFilter}
                            displayEmpty
                            variant='outlined'
                            size='small'
                            className="select-filter"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {filterTypes.map((type, id) => (
                                <MenuItem key={id} value={type}>{type}</MenuItem>
                            ))}
                        </Select>

                        <OutlinedInput
                            startAdornment={
                                <InputAdornment position='start'>
                                    <FontAwesomeIcon icon={faSearch} onClick={searchArtists} />
                                </InputAdornment>
                            }
                            placeholder="procurar pelo nome"
                            className="search-filter"
                            onChange={searchArtists}
                            onKeyDown={searchArtists}
                        />

                        {isLoading && (
                            <div className="mini-loading">
                                <CircularProgress size={20} style={{ color: '#D60000' }} />
                            </div>
                        )}
                    </div>
                    <Grid container spacing={5}>
                        {artists?.length > 0 ? artists.map(i => (
                            <Grid item md={4} key={i._id}>
                                <InfoCard artista={i} goToArtist={goToArtist} active={i.active} />
                            </Grid>
                        ))
                            : <p>Desculpe, não temos nenhum resultado para sua busca.</p>}
                    </Grid>
                    <div className='pagination'>
                        <Pagination page={currentPage} count={totalPages} variant="outlined" shape="rounded" onChange={handlePagination} />
                    </div>
                </section>
            )
    )
};