import { createContext, useContext, useReducer, useState } from "react";
import ArtistReducer, { initialState, cases } from "../reducers/artists";
import { getAllArtistas, getArtista, getPaginatedArtistas } from "../services/artistaService";

const ArtistContext = createContext(initialState);

export const ArtistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ArtistReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);

    const getPaginatedArtists = async (page, search) => {
        setIsLoading(true);
        try {
            const apiResponse = await getPaginatedArtistas(page, search).then(res => res.data);
            
            dispatch({
                type: cases.GET_ARTISTS,
                payload: {
                    artists: apiResponse?.artists,
                    totalPages: apiResponse?.totalPages,
                    allIds: apiResponse?.allIds,
                    selectedLetter: search,
                    filterTypes: apiResponse?.filterTypes
                }
            });

            dispatch({
                type: cases.GET_FILTER_LETTERS,
                payload: {
                    filterLetters: apiResponse?.availableLetters
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllArtists = async () => {
        setIsLoading(true);
        try {
            const apiResponse = await getAllArtistas().then(res => res.data);

            dispatch({
                type: cases.GET_ARTISTS,
                payload: {
                    artists: apiResponse.artists,
                    totalPages: apiResponse.totalPages
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getArtist = async (id) => {
        setIsLoading(true);
        try {
            const apiResponse = await getArtista(id).then(res => res.data);

            dispatch({
                type: cases.SET_CURRENT_ARTIST,
                payload: {
                    currentArtist: apiResponse.artista,
                    navigation: apiResponse.navigation
                }
            })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const changePage = (page, search = '') => {
        getPaginatedArtists(page, search);

        dispatch({
            type: cases.SET_PAGE,
            payload: {
                page,
                selectedLetter: search
            }
        });
    };

    const setCurrentArtist = (artist) => {
        dispatch({
            type: cases.SET_CURRENT_ARTIST,
            payload: {
                currentArtist: artist
            }
        })
    };

    const querySearchArtist = async (query) => {
        setIsLoading(true);
        try {
            const apiResponse = await getAllArtistas().then(res => res.data); 
            const allArtists = apiResponse.artists;
            const searchQuery = new RegExp(query, 'i');
            const filteredArtists = allArtists.filter(artist => searchQuery.test(artist.nome));

            dispatch({
                type: cases.GET_ARTISTS,
                payload: {
                    artists: filteredArtists,
                    totalPages: 1,
                    allIds: apiResponse.allIds,
                    selectedLetter: '',
                    filterTypes: apiResponse.filterTypes,
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const typeSearchArtist = async (type) => {
        if(type != "") {
            setIsLoading(true);
            try {
                const apiResponse = await getAllArtistas().then(res => res.data); 
                const allArtists = apiResponse.artists;

                const artistsWithStudyArea = allArtists.filter(artist => artist.estudos && artist.estudos.length > 0);
                
                const filteredArtists = artistsWithStudyArea.filter(artist =>
                    artist.estudos.some(estudo => estudo.area == type)
                );

                dispatch({
                    type: cases.GET_ARTISTS,
                    payload: {
                        artists: filteredArtists,
                        totalPages: 1,
                        allIds: apiResponse.allIds,
                        selectedLetter: '',
                        filterTypes: apiResponse.filterTypes,
                    }
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            getPaginatedArtists();
        }
    };

    const value = {
        ...state,
        isLoading,
        getAllArtists,
        getArtist,
        getPaginatedArtists,
        changePage,
        setCurrentArtist,
        querySearchArtist,
        typeSearchArtist
    };
    return <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>;
};

const useArtist = () => {
    const context = useContext(ArtistContext);

    if (context === undefined) {
        throw new Error("useArtist must be used within ArtistContext");
    }

    return context;
};

export default useArtist;
