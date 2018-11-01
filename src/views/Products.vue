<template>
    <el-container direction="vertical" class="bg-white">
        <el-table v-if="productsList" :data="productsList" style="width: 100%">
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column label="Назва" prop="name" width="180">
            </el-table-column>
            <el-table-column label="Розмір" prop="name" width="180">
            </el-table-column>
            <el-table-column label="Колір" prop="name" width="180">
            </el-table-column>
            <el-table-column label="Ціна" prop="price" width="180">
            </el-table-column>
            <!-- при ховері повний опис давати -->
            <el-table-column label="Короткий опис" prop="shortDescription" width="180">
               <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>Description: {{ scope.row.description }}</p>
                    <div slot="reference" class="name-wrapper">
                        <span >{{ scope.row.name }}</span>
                    </div>
                    </el-popover>              
                </template>
            </el-table-column>
            <el-table-column label="Operations">
                <template slot-scope="scope">
                    <el-button size="mini">Редагувати</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
                    v-if="productsList" 
                    background layout="prev, pager, next" 
                    :current-page.sync="currentPage" 
                    :page-size="numberElementsOnThePage" 
                    :total="allProductsNumber" 
                    @current-change="newPage"
                    >
        </el-pagination>
    </el-container>
</template>

<script>
	export default {
		data() {
			return {
				productsList: [],
				currentPage: 1,
				// скільки елементів на сторінці
				numberElementsOnThePage: 2,
				// кількість всіх елементів
				allProductsNumber: 0,
			}
		},
		methods: {
			// запит на нову кількість продуктів
			newPage() {
				this.$api.get('/products',{
					params: {
						startPosition: this.numberElementsOnThePage * (this.currentPage - 1),
						numberOfItems: this.numberElementsOnThePage,
					}
				})
					.then(response => {
						console.log(response)
						this.productsList = response.data
					})
					.catch(err => console.error(err))
					// запит на загальну кількість елементів??
			}
		},
		created() {
			// отримуємо numberElementsOnThePage - елементів
			this.$api.get('/products',{
				params: {
					startPosition: this.numberElementsOnThePage * (this.currentPage - 1),
					numberOfItems: this.numberElementsOnThePage,
				}
			})
				.then(response => {
					console.log(response)
					// return JSON.parse(response);
					this.productsList = response.data
				})
				.catch(err => console.error(err))
			// отримуєм allProductsNumber
			this.$api.get('/products/count')
				.then(response => {
					console.log(response.data)
					this.allProductsNumber = response.data
				})
		}
	}
</script>

<style scoped>

</style>
