import React, {Component} from 'react';

import UsersAddForm from '../users-add-form/users-add-form.js';
import UsersList from '../users-list/users-list.js';
import StatusFilter from '../status-filter/status-filter.js';
import SearchPanel from 'components/search-panel/search-panel.js';

import './index.css'



const date = [
            { companyId: 123456789, firstName: 'John', lastName: 'Frederick', email: 'email@email.com', gender: 'MALE', role: 'ADMIN', id: 123},
            { companyId: 123468789, firstName: 'Jofghfhn', lastName: 'Fredgfherick', email: 'emaighgl@email.com', gender: 'MALE', role: 'ADMIN', id: 1321},
            { companyId: 457657765, firstName: 'ghf', lastName: 'Fredefghrick', email: 'emaghil@email.com', gender: 'MALE', role: 'ADMIN', id: 543},
]
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date,
            term: ''
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.searchPost = this.searchPost.bind(this)
    }

    deleteItem(id) {
        this.setState(({date}) => {
            const index = date.findIndex(elem => elem.id === id);

            const before = date.slice(0, index);
            const after = date.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                date: newArr
            }
        });
    }

    addItem({companyId, firstName, lastName, email, gender, role}) {
        const newItem = {
            companyId,
            firstName,
            lastName,
            email,
            gender,
            role
        }
        this.setState(({date}) => {
            return {
                date:  [...date, newItem]
            }
        })
    }

    searchPost(items, term) {
        if (term.lenght === 0) {
            return items
        }

        return items.filter( (item) => {
            return item.firstName.indexOf(term) > -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    render() {

        const {date, term} = this.state;

        const visiblePosts = this.searchPost(date, term);

        return (
            <div className='zag'>
                <UsersAddForm
                    onAdd={this.addItem}
                />
                {/* PostListUser => UsersList,  PostAddFormUser => <UserForm user={объект юзера если это редактирование, в ином это новый юзер или нет} */}
                <div className='d-flex'>
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <StatusFilter />                    
                </div>

                <UsersList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                />

            </div>
        );
    }
}